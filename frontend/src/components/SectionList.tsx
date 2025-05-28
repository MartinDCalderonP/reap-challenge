import AddField from '@/components/AddField'
import type { Section } from '@/types'

interface SectionListProps {
  sections: Section[]
  setSections: (s: Section[]) => void
}

const SectionList = ({ sections, setSections }: SectionListProps) => (
  <div className='mb-4'>
    <div className='font-medium mb-2'>Sections</div>

    {sections.map((section, sectionIndex) => (
      <div key={section.title} className='mb-3 p-3 bg-gray-50 rounded'>
        <div className='font-semibold mb-1'>{section.title}</div>

        {section.description && (
          <div className='text-gray-500 text-sm mb-1'>
            {section.description}
          </div>
        )}

        <div className='ml-2'>
          {section.fields.map((field) => (
            <div key={field.label} className='text-sm text-gray-700'>
              {field.label} ({field.type.toLowerCase()})
            </div>
          ))}
        </div>

        <AddField
          onAdd={(field) => {
            setSections(
              sections.map((section, index) =>
                index === sectionIndex
                  ? {
                      ...section,
                      fields: [
                        ...section.fields,
                        { ...field, order: section.fields.length }
                      ]
                    }
                  : section
              )
            )
          }}
        />
      </div>
    ))}
  </div>
)

export default SectionList
