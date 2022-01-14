import ProjectList from "../project-list/project-list";
import { useGetMeQuery, useCreateProjectMutation, useSetMyUsernameMutation } from "../schemas";
import Button from "../shared/Button";
import Input from "../shared/Input";
import "./myProfile.css"

export const MyProfile: React.FC = (props) => {
    const { data, loading, error, refetch } = useGetMeQuery();
    const [setMyUsername] = useSetMyUsernameMutation()
    const [createProjectMutation] = useCreateProjectMutation();
    let titleRef = { value: '' }
    let descriptionRef = { value: '' }
    return (
        <div className="my-profile">
            <h1>My Profile</h1>
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

            <div className="profile-card">
                <h2>Create Project</h2>
                <Input description="Title" valueRef={titleRef} />
                <Input description="Description" valueRef={descriptionRef} />
                <Button onClick={async () => {
                    const res = await createProjectMutation({ variables: { newProject: { name: titleRef.value, description: descriptionRef.value, languages: [] } } })
                    alert("Created project with id: " + res.data?.createProject.id)
                }}>Create Project</Button>
            </div>
        </div>
    )

}