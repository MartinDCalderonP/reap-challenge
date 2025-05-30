import AddField from '@/components/AddField'
import type { Section, Field } from '@/types'

interface SectionListProps {
  sections: Section[]
  addField: (sectionIndex: number, field: Field) => boolean
}

const SectionList = ({ sections, addField }: SectionListProps) => (
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
          {section.fields.map((field: Field) => (
            <div key={field.label} className='text-sm text-gray-700'>
              {field.label} ({field.type.toLowerCase()})
            </div>
          ))}
        </div>

        <AddField addField={addField} sectionIndex={sectionIndex} />
      </div>
    ))}
  </div>
)

export default SectionList
