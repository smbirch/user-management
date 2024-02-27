package com.cooksys.groupfinal.services;

import java.util.Set;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.CompanyDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;

public interface CompanyService {

	Set<FullUserDto> getAllTotalUsers(Long id);

	Set<FullUserDto> getAllActiveUsers(Long id);

	Set<AnnouncementDto> getAllAnnouncements(Long id);

	Set<TeamDto> getAllTeams(Long id);

	Set<ProjectDto> getAllProjects(Long companyId, Long teamId);

    AnnouncementDto createAnnouncement(AnnouncementDto announcementDto);

//     ///////////////////////////////////
    
//     Set<CompanyDto> getAllCompanies();
    
//     CompanyDto getCompanyById(Long companyId);
	
//     CompanyDto updateCompany(Long companyId, CompanyDto companyDto);
	
// 	CompanyDto deleteCompany(Long companyId);
    
//     CompanyDto createCompany(CompanyDto companyDto);

//     ///////////////////////////////////

//     AnnouncementDto getAnnouncementById(Long companyId, Long announcementId);
    
//     AnnouncementDto updateAnnouncement(Long companyId, Long announcementId, AnnouncementDto announcementDto);
    
//     AnnouncementDto deleteAnnouncement(Long companyId, Long announcementId);

//     //////////////////////////////////
    
//     TeamDto updateTeam(Long companyId, Long teamId, TeamDto teamDto);
    
//     TeamDto deleteTeam(Long companyId, Long teamId);

//     //////////////////////////////////////
    
//     ProjectDto updateProject(Long companyId, Long teamId, Long projectId, ProjectDto projectDto);
    
//     ProjectDto deleteProject(Long companyId, Long teamId, Long projectId);

}
