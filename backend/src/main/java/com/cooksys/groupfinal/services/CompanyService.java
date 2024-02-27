package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;

import java.util.Set;

public interface CompanyService {

	Set<FullUserDto> getAllUsers(Long id);

	Set<AnnouncementDto> getAllAnnouncements(Long id);

	Set<TeamDto> getAllTeams(Long id);

	Set<ProjectDto> getAllProjects(Long companyId, Long teamId);

	TeamDto createTeam(Long companyId, TeamDto teamDto);

	ProjectDto getProject(Long companyId, Long teamId, Long projectId);

	ProjectDto createProject(Long companyId, Long teamId, ProjectDto projectDto);

	ProjectDto updateProject(Long companyId, Long teamId, Long projectId, ProjectDto projectDto);
}
