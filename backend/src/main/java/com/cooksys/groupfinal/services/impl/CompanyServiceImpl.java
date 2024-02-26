package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.*;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.*;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.services.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
	
	private final CompanyRepository companyRepository;
	private final TeamRepository teamRepository;

	private final ProjectRepository projectRepository;
	private final FullUserMapper fullUserMapper;
	private final BasicUserMapper basicUserMapper;
	private final AnnouncementMapper announcementMapper;
	private final TeamMapper teamMapper;
	private final ProjectMapper projectMapper;
	
	private Company findCompany(Long id) {
        Optional<Company> company = companyRepository.findById(id);
        if (company.isEmpty()) {
            throw new NotFoundException("A company with the provided id does not exist.");
        }
        return company.get();
    }
	
	private Team findTeam(Long id) {
        Optional<Team> team = teamRepository.findById(id);
        if (team.isEmpty()) {
            throw new NotFoundException("A team with the provided id does not exist.");
        }
        return team.get();
    }

	private Project findProject(Long id) {
		Optional<Project> project = projectRepository.findById(id);
		if (project.isEmpty()) {
			throw new NotFoundException("A project with the provided id does not exist.");
		}
		return project.get();
	}
	
	@Override
	public Set<FullUserDto> getAllUsers(Long id) {
		Company company = findCompany(id);
		Set<User> filteredUsers = new HashSet<>();
		company.getEmployees().forEach(filteredUsers::add);
		filteredUsers.removeIf(user -> !user.isActive());
		return fullUserMapper.entitiesToFullUserDtos(filteredUsers);
	}

	@Override
	public Set<AnnouncementDto> getAllAnnouncements(Long id) {
		Company company = findCompany(id);
		List<Announcement> sortedList = new ArrayList<Announcement>(company.getAnnouncements());
		sortedList.sort(Comparator.comparing(Announcement::getDate).reversed());
		Set<Announcement> sortedSet = new HashSet<Announcement>(sortedList);
		return announcementMapper.entitiesToDtos(sortedSet);
	}


	@Override
	public Set<TeamDto> getAllTeams(Long id) {
		Company company = findCompany(id);
		return teamMapper.entitiesToDtos(company.getTeams());
	}

	@Override
	public TeamDto createTeam(Long companyId, TeamDto teamDto) {

		Company company = findCompany(companyId);
		Team team = new Team();

		team.setCompany(company);
		team.setName(teamDto.getName());
		team.setDescription(teamDto.getDescription());

		Set<BasicUserDto> users = new HashSet<>();
		users.addAll(teamDto.getTeammates());
		team.setTeammates(basicUserMapper.requestDtosToEntities(teamDto.getTeammates()));

		return teamMapper.entityToDto(teamRepository.saveAndFlush(team));
	}


	@Override
	public Set<ProjectDto> getAllProjects(Long companyId, Long teamId) {
		Company company = findCompany(companyId);
		Team team = findTeam(teamId);
		if (!company.getTeams().contains(team)) {
			throw new NotFoundException("A team with id " + teamId + " does not exist at company with id " + companyId + ".");
		}
		Set<Project> filteredProjects = new HashSet<>();
		team.getProjects().forEach(filteredProjects::add);
		filteredProjects.removeIf(project -> !project.isActive());
		return projectMapper.entitiesToDtos(filteredProjects);
	}

	@Override
	public ProjectDto getProject(Long companyId, Long teamId, Long projectId) {
		findCompany(companyId);
		findTeam(teamId);
		Project project = findProject(projectId);
		return projectMapper.entityToDto(project);

	}

	@Override
	public ProjectDto createProject(Long companyId, Long teamId, ProjectDto projectDto) {
		findCompany(companyId);
		Team team = findTeam(teamId);
		Project project = new Project();

		project.setName(projectDto.getName());
		project.setDescription(projectDto.getDescription());
		project.setTeam(team);
		project.setActive(projectDto.isActive());

		return projectMapper.entityToDto(projectRepository.saveAndFlush(project));

	}


}
