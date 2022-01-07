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
            <p>Username: {data?.me?.username}<Input description="Update username" onEnter={(newUsername) => {
                setMyUsername({ variables: { username: newUsername } }).then((res) => {
                    if (res.data?.setMyUsername) {
                        refetch()
                    } else {
                        alert("Username already taken")
                    }
                })
            }} /></p>
            <h2>My projects</h2>
            {data?.me.createdProjects?.map(project => (
                <div>
                    <h2 >{project.name}</h2>
                    <p>{project.description}</p>
                </div>
            ))}
            <h2>Create Project</h2>
            <Input description="Title" valueRef={titleRef} />
            <Input description="Description" valueRef={descriptionRef} />
            <Button onClick={async () => {
                const res = await createProjectMutation({ variables: { newProject: { name: titleRef.value, description: descriptionRef.value, languages: [] } } })
                alert("Created project with id: " + res.data?.createProject.id)
            }}>Create Project</Button>
        </div>
    )

}