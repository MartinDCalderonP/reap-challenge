import type { Section } from '@/types'

interface SectionFormProps {
  section: Section
  values: Record<string, string | number>
  onChange: (fieldKey: string, value: string) => void
  onSubmit: () => void
  isFirst: boolean
  isLast: boolean
  onNext: () => void
  onPrev: () => void
}

const SectionForm = ({
  section,
  values,
  onChange,
  onSubmit,
  isFirst,
  isLast,
  onNext,
  onPrev
}: SectionFormProps) => (
  <>
    <form
      className='bg-white rounded-xl shadow p-8 min-w-[350px] max-w-md mx-auto'
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <h2 className='text-xl font-bold mb-2 text-gray-900'>{section.title}</h2>

      {section.description && (
        <p className='text-gray-500 text-sm mb-6'>{section.description}</p>
      )}

      <div className='flex flex-col gap-4'>
        {section.fields.map((field, index) => (
          <div key={field.label}>
            <label className='block font-medium mb-1 text-gray-700'>
              {field.label}
            </label>
            <input
              type={field.type === 'NUMBER' ? 'number' : 'text'}
              className='w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 text-base text-black'
              value={values[`${section.order}-${index}`] ?? ''}
              onChange={(e) =>
                onChange(`${section.order}-${index}`, e.target.value)
              }
              placeholder={field.label}
              required
            />
          </div>
        ))}
      </div>
    </form>
    <div className='flex justify-between gap-4 mt-4'>
      {!isFirst && (
        <button
          type='button'
          className='w-full px-8 py-2 rounded bg-gray-800 text-white font-semibold hover:bg-gray-900 text-lg cursor-pointer'
          onClick={onPrev}
        >
          Back
        </button>
      )}

      <button
        type='button'
        className='w-full px-8 py-2 rounded bg-green-800 text-white font-semibold hover:bg-green-900 text-lg cursor-pointer'
        onClick={isLast ? onSubmit : onNext}
      >
        {isLast ? 'Submit' : 'Continue'}
      </button>
    </div>
  </>
)

export default SectionForm
