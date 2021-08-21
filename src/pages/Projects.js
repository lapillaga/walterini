import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sectiontitle from "../components/Sectiontitle";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import ProjectView from "../components/ProjectView";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(6);

    useEffect(() => {
        let mounted = true;
        axios.get("/api/projects").then((response) => {
            if (mounted) {
                setProjects(response.data);
            }
        });
        return () => (mounted = false);
    }, [projects]);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    const paginate = (e, pageNumber) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
    };

    return (
        <Layout>
            <Helmet>
                <title>Proyectos - Walterini</title>
                <meta
                    name="description"
                    content="Walterini Projects Page"
                />
            </Helmet>
            <div className="mi-about mi-section mi-padding-top mi-padding-bottom">
                <div className="container">
                    <Sectiontitle title="Mis Proyectos" />
                    <ProjectView projects={currentProjects} />
                    {!(projects.length > projectsPerPage) ? null : (
                        <Pagination
                            className="mt-50"
                            itemsPerPage={projectsPerPage}
                            totalItems={projects.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Projects;
