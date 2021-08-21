import React from "react";
import Project from "./Project";

function ProjectView({projects}) {
    return (
        <div className="row mt-30-reverse">
            {projects.map(project => (
                <div className="col-lg-6 col-md-6 col-12 mt-30" key={project.id}>
                    <Project data={project} />
                </div>
            ))}
        </div>
    );
}

export default ProjectView;
