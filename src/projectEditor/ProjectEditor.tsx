import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAddImageMutation, useDeleteProjectMutation, useGetProjectByIdQuery, useRemoveImageMutation, useUpdateImageDescriptionMutation, useUpdateProjectDescriptionMutation, useUpdateProjectNameMutation } from "../schemas"
import Button from "../shared/Button"
import Input from "../shared/Input"
import "./projectEditor.css"
export const ProjectEditor: React.FC = props => {
    const params = useParams()
    const projectId = params["id"]
    const projectData = useGetProjectByIdQuery({ variables: { id: projectId || "" } })
    const [removeImage] = useRemoveImageMutation()
    const [updateImageDescription] = useUpdateImageDescriptionMutation()
    const [addImage] = useAddImageMutation()
    const [updateProjectName] = useUpdateProjectNameMutation()
    const [updateProjectDescription] = useUpdateProjectDescriptionMutation()
    const [deleteProject] = useDeleteProjectMutation()
    const navigate = useNavigate()
    const [newImageURL, setNewImageURL] = useState("")
    const [imageLoaded, setImageLoaded] = useState(false)
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
            <div className="image-list">
                {projectData.data?.getProject?.images.map(image => {
                    return (
                        <div className="image-editor">
                            <img src={image.url} />
                            <p><Input description="Update Image Description" initialValue={image.description || undefined} onEnter={(newDescription) => {
                                updateImageDescription({ variables: { projectId: projectId, newDescription: newDescription, imageId: image.id } })
                                    .then((res) => {
                                        if (res.data?.projectMutation?.updateImageDescription) {
                                            alert("Successfully updated image description!")
                                        } else {
                                            alert(res.errors?.join(""))
                                        }
                                        projectData.refetch()
                                    }).catch((r) => {
                                        alert("Could not update description")
                                    })
                            }} /></p>
                            <p>
                                <Button onClick={() => {
                                    removeImage({ variables: { projectId: projectId, imageId: image.id } })
                                        .then((res) => {
                                            if (res.data?.projectMutation?.removeImage) {
                                                alert("Successfully removed image!")
                                            } else {
                                                alert(res.errors?.join(""))
                                            }
                                            projectData.refetch()
                                        }).catch((r) => {
                                            alert("Could not remove image")
                                        })

                                }} >Remove Image</Button>
                            </p>
                        </div>)
                })}
            </div>
            <p>
                <h2>Add new image</h2>
                <Input description="Image URL" clearOnEnter onChange={(newVal) => {
                    setNewImageURL(newVal)
                    setImageLoaded(false)
                }} />
                <img src={newImageURL} onLoad={() => {
                    setImageLoaded(true)
                }} />
                {imageLoaded && <Button onClick={() => {
                    addImage({ variables: { projectId: projectId, newImage: { url: newImageURL } } })
                        .then((res) => {
                            if (res.data?.projectMutation?.addImage) {
                                alert("Successfully added image!")
                            } else {
                                alert(res.errors?.join(""))
                            }
                            projectData.refetch()
                        }).catch((r) => {
                            alert("Could not add image")
                        })
                }} >Add Image</Button>}
            </p>

            <p><Button onClick={() => {
                deleteProject({ variables: { projectId: projectId } })

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