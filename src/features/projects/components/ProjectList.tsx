import { useState } from 'react'
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md'
import { useProjects } from '../hooks/useProjects'
import { ModalAddProject } from './modals/ModalAddProject'
import { ModalEditProject } from './modals/ModalEditProject'
import { ConfirmDeleteProject } from './ConfirmDeleteProject'
import type { Project } from '../dtos/project.interface'

export const ProjectList = () => {
  const { data, isLoading } = useProjects()
  
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const handleEdit = (project: Project) => {
    setSelectedProject(project)
    setIsEditOpen(true)
  }

  const handleDelete = (project: Project) => {
    setSelectedProject(project)
    setIsDeleteOpen(true)
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-neutral-light overflow-hidden">
      <div className="p-4 md:p-6 border-b border-neutral-light">
        <h2 className="text-xl md:text-2xl font-bold text-background-dark flex items-center gap-3">
          <div className="w-1.5 h-6 bg-primary rounded-full" />
          Proyectos de Software
        </h2>
        <p className="text-neutral-medium text-sm mt-2">
          Gestiona los proyectos en los que participaste para mostrarlos en tu portafolio.
        </p>
      </div>

      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          
          <button
            onClick={() => setIsAddOpen(true)}
            className="h-[200px] flex flex-col items-center justify-center bg-[#f8f9fa] border-2 border-dashed border-neutral-300 rounded-2xl hover:border-primary hover:bg-[#ebf0f8] transition-colors cursor-pointer group"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 group-hover:text-primary transition-all">
              <MdAdd size={24} className="text-neutral-medium group-hover:text-primary" />
            </div>
            <span className="font-semibold text-background-dark group-hover:text-primary">
              Crear proyecto de software
            </span>
          </button>

          {isLoading ? (
            <div className="h-[200px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            data?.data.map((project) => (
              <div key={project.id} className="group relative h-[200px] rounded-2xl border border-neutral-200 bg-white p-5 flex flex-col overflow-hidden hover:border-primary hover:shadow-md transition-all">
                <div className="mb-auto">
                  <h3 className="font-semibold text-background-dark text-lg line-clamp-1" title={project.title}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-medium mt-1 line-clamp-2" title={project.description}>
                    {project.description}
                  </p>
                  <p className="text-xs text-primary-soft font-medium mt-2">
                    {project.role}
                  </p>
                  <div className="flex gap-2 flex-wrap mt-2 overflow-hidden max-h-[24px]">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="bg-neutral-100 text-neutral-600 text-xs px-2 py-0.5 rounded border border-neutral-200">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="bg-neutral-100 text-neutral-600 text-xs px-2 py-0.5 rounded border border-neutral-200">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="right-4 bottom-4 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 rounded-full border border-neutral-200 bg-white shadow-sm hover:text-primary hover:border-primary transition-colors tooltip"
                    title="Editar"
                  >
                    <MdEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(project)}
                    className="p-2 rounded-full border border-neutral-200 bg-white shadow-sm hover:text-red-500 hover:border-red-500 transition-colors tooltip"
                    title="Eliminar"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ModalAddProject isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      
      {selectedProject && (
        <>
          <ModalEditProject
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            project={selectedProject}
          />
          <ConfirmDeleteProject
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            projectId={selectedProject.id}
          />
        </>
      )}
    </section>
  )
}
