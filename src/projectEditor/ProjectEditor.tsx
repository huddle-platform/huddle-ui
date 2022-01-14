import { Link, useNavigate, useParams } from "react-router-dom"
import { useDeleteProjectMutation, useGetProjectByIdQuery, useUpdateProjectDescriptionMutation, useUpdateProjectNameMutation } from "../schemas"
import Button from "../shared/Button"
import Input from "../shared/Input"
import "./projectEditor.css"
export const ProjectEditor: React.FC = props => {
    const params = useParams()
    const projectId = params["id"]
    const projectData = useGetProjectByIdQuery({ variables: { id: projectId || "" } })
    const [updateProjectName] = useUpdateProjectNameMutation()
    const [updateProjectDescription] = useUpdateProjectDescriptionMutation()
    const [deleteProject] = useDeleteProjectMutation()
    const navigate = useNavigate()
    if (!projectId) {
        return <Link to="/">Invalid URL! Go home</Link>
    }
    if (projectData.data) {
        <Link to="/">Invalid Project ID! Go home</Link>
    }
    return (
        <div className="project-editor">
            <h1>Edit project "{projectData.data?.getProject?.name}"</h1>
            <p>Name: <Input description="Update Project Name" initialValue={projectData.data?.getProject?.name} onEnter={(newName) => {
                updateProjectName({ variables: { newName: newName, projectId: projectId } })
                    .then((res) => {
                        if (res.data?.projectMutation?.updateName) {
                            alert("Successfully updated project name!")
                        } else {
                            alert(res.errors?.join(""))
                        }
                        projectData.refetch()
                    }).catch((r) => {
                        alert("Could not update name")
                    })
            }} /></p>

            <p>Description: <Input description="Update Project Name" initialValue={projectData.data?.getProject?.description} onEnter={(newDescription) => {
                updateProjectDescription({ variables: { newDescription: newDescription, projectId: projectId } })
                    .then((res) => {
                        if (res.data?.projectMutation?.updateDescription) {
                            alert("Successfully updated project description!")
                        } else {
                            alert(res.errors?.join(""))
                        }
                        projectData.refetch()
                    }).catch((r) => {
                        alert("Could not update description")
                    })
            }} /></p>
            <p><Button onClick={() => {
                deleteProject({variables:{projectId:projectId}})

                    .then((res) => {
                        if (res.data?.projectMutation?.deleteProject) {
                            alert("Successfully deleted project description!")
                            navigate("/")
                        } else {
                            alert(res.errors?.join(""))
                        }
                    }).catch((r) => {
                        alert("Could not delete project")
                    })
            }} >Delete Project</Button></p>
        </div>
    )
}