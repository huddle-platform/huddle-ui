
import loadable from '@loadable/component';
const MDEditor=loadable(()=>import('@uiw/react-md-editor'))
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAddImageMutation, useDeleteProjectMutation, useGetProjectByIdQuery, useRemoveImageMutation, useUpdateImageDescriptionMutation, useUpdateProjectDescriptionMutation, useUpdateProjectNameMutation } from "../schemas"
import Button from "../shared/Button"
import Input from "../shared/Input"
import "./projectEditor.css"
import useConfig from "../config";


export const ProjectEditor: React.FC = props => {
    const params = useParams()
    const projectId = params["id"]
    const config = useConfig()
    const [description, setDescription] = useState<string | null>(localStorage.getItem("description#" + projectId))
    const projectData = useGetProjectByIdQuery({
        variables: { id: projectId || "" }, onCompleted: (data) => {
            setDescription(data?.getProject?.description || null)
        }
    })
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
            <p className="project-editor-component">Name: <Input description="Update Project Name" initialValue={projectData.data?.getProject?.name} onEnter={(newName) => {
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
            {description !== null && <div className="project-editor-component">
                <h2>Description</h2>
                <MDEditor value={description} preview={config.view == "mobile" ? "edit" : undefined}
                    onChange={(newDescription) => {
                        setDescription(newDescription || null)
                    }}
                />
                <Button onClick={() => {
                    const newDescription = description || ""
                    setDescription(null)
                    updateProjectDescription({ variables: { newDescription, projectId: projectId } })
                        .then((res) => {
                            if (res.data?.projectMutation?.updateDescription) {
                                projectData.refetch().then(() => {
                                    setDescription(newDescription)
                                })
                            } else {
                                alert(res.errors?.join(""))
                                setDescription(newDescription)
                            }
                        }).catch((r) => {
                            alert("Could not update description")
                            setDescription(newDescription)
                        })

                }}>Save</Button>

            </div>}
            {projectData.data?.getProject?.images[0] && <div className="project-editor-component">
                <h2>Images</h2>
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
            </div>}
            <p className="project-editor-component">
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

            <p style={{textAlign:"center"}}><Button onClick={() => {
                deleteProject({ variables: { projectId: projectId } })

                    .then((res) => {
                        if (res.data?.projectMutation?.deleteProject) {
                            alert("Successfully deleted project!")
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