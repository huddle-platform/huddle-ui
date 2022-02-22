import ProjectList from "../project-list/project-list"
import { useGetSavedProjectsQuery } from "../schemas"
import "./savedProjects.css"
export const SavedProjects: React.FC = props => {
    const { data } = useGetSavedProjectsQuery()
    if (!data?.savedProjects) {
        return <p>Loading...</p>
    }
    return (
        <div className="saved-projects">
            <ProjectList entries={data.savedProjects.map(p => ({
                name: p.name,
                description: p.description,
                id: p.id,
                location: p.location?.name,
                lastUpdated: p.createdAt
            }))} />
        </div>)
}