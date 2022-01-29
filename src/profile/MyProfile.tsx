import { useNavigate } from "react-router-dom";
import ProjectList from "../project-list/project-list";
import { useGetMeQuery, useCreateProjectMutation, useSetMyUsernameMutation } from "../schemas";
import Button from "../shared/Button";
import Input from "../shared/Input";
import "./myProfile.css"

export const MyProfile: React.FC = (props) => {
    const { data, loading, error, refetch } = useGetMeQuery();
    const [setMyUsername] = useSetMyUsernameMutation()
    const [createProjectMutation] = useCreateProjectMutation();
    const navigate = useNavigate()
    return (
        <div className="my-profile">
            <h1>My Profile</h1>
            <div className="profile-card">
                <div>Email: {data?.me.email}</div>
                <p>Username: {data?.me?.username}<Input description="Update username" enterOnUnfocus onEnter={(newUsername) => {
                    setMyUsername({ variables: { username: newUsername } }).then((res) => {
                        if (res.data?.setMyUsername) {
                            refetch()
                        } else {
                            alert("Username already taken")
                        }
                    })
                }} /></p>
            </div>
            <div className="profile-card">
                <h2>My projects</h2>
                <div className="my-profile-my-projects-container">
                    <ProjectList entries={data?.me.createdProjects?.map(p => ({
                        description: p.description,
                        name: p.name,
                        id: p.id
                    })) || []} />
                </div>
            </div>

            <p style={{ textAlign: "center" }}>
                <Button onClick={async () => {
                    const res = await createProjectMutation({ variables: { newProject: { name: "My new project", description: "", languages: [] } } })
                    if (res.data?.createProject) {
                        navigate(`/edit-project/${res.data.createProject.id}`)
                    }

                }}>Create new Project</Button>
            </p>
        </div>
    )

}