import type { Section } from '@/types'
import Input from '@/components/Input'
import Button from '@/components/Button'

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
}: SectionFormProps) => {
  const buttons = [
    {
      bgColor: 'bg-gray-800',
      disabled: isFirst,
      hoverBgColor: 'hover:bg-gray-900',
      label: 'Back',
      onClick: onPrev
    },
    {
      bgColor: 'bg-green-800',
      label: isLast ? 'Submit' : 'Continue',
      disabled: false,
      hoverBgColor: 'hover:bg-green-900',
      onClick: isLast ? onSubmit : onNext
    }
  ]

  return (
    <>
      <form
        className='bg-white rounded-xl shadow p-8 min-w-[350px] max-w-md mx-auto'
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <h2 className='text-xl font-bold mb-2 text-gray-900'>
          {section.title}
        </h2>

        {section.description && (
          <p className='text-gray-500 text-sm mb-6'>{section.description}</p>
        )}

        <div className='flex flex-col gap-4'>
          {section.fields.map((field, index) => (
            <div key={field.label}>
              <label className='block font-medium mb-1 text-gray-700'>
                {field.label}
              </label>
              <Input
                type={field.type === 'NUMBER' ? 'number' : 'text'}
                className='w-full bg-gray-50 text-base text-black'
                value={values[`${section.order}-${index}`] ?? ''}
                onChange={(event) =>
                  onChange(`${section.order}-${index}`, event.target.value)
                }
                placeholder={field.label}
                required
              />
            </div>
          ))}
        </div>
      </form>
      <div className='flex justify-between gap-4 mt-4'>
        {buttons.map(({ label, disabled, onClick }) => (
          <Button
            key={label}
            type='button'
            className='w-full'
            color={label === 'Back' ? 'gray' : 'primary'}
            disabled={disabled}
            onClick={onClick}
            fullWidth
          >
            {label}
          </Button>
        ))}
      </div>
    </>
  )
}

export default SectionForm
