import { useGetMeQuery, useCreateProjectMutation } from "../schemas";
import Button from "../shared/Button";
import Input from "../shared/Input";

export const MyProfile: React.FC = (props) => {
    const { data, loading, error } = useGetMeQuery();
    const [createProjectMutation, { data: createProjectMutationData, loading: createProjectMutationLoading, error: createProjectMutationError }] = useCreateProjectMutation();
    //if (loading) return <div>Loading...</div>;
    //if (error) return <div>Error...</div>;
    let titleRef = { value: '' }
    let descriptionRef = { value: '' }
    return (
        <div>
            <h1>My Profile</h1>
            <div>Email: {data?.me.email}</div>
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