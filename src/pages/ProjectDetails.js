import { Helmet } from "react-helmet";
import Disqus from "disqus-react";
import React, { useEffect, useState } from "react";
import MarkDown from "markdown-to-jsx";
import Layout from "../components/Layout";

function ProjectDetails(props) {
    const [content, setContent] = useState("");
    const projectId = props.match.params.id;
    const projectFile = props.match.params.title;

    useEffect(() => {
        import(`../project/${projectFile}.md`)
            .then((res) => {
                fetch(res.default)
                    .then((res) => res.text())
                    .then((res) => setContent(res));
            })
            .catch((err) => console.log(err));
    }, [projectFile]);

    const disqusShortname = "walterini-1"; //found in your Disqus.com dashboard
    const disqusConfig = {
        url: "https://walterfvelasquez.me/", //Homepage link of this site.
        identifier: projectId,
        title: projectFile,
    };

    return (
        <Layout>
            <Helmet>
                <title>Detalle Proyecto - Walterini</title>
                <meta
                    name="description"
                    content="Project Details Page"
                />
            </Helmet>
            <div className="mi-blog-details mi-section mi-padding-top mi-padding-bottom">
                <div className="container">
                    <MarkDown>{content}</MarkDown>
                    <div className="mi-blog-details-comments mt-30">
                        <Disqus.DiscussionEmbed
                            shortname={disqusShortname}
                            config={disqusConfig}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjectDetails;
