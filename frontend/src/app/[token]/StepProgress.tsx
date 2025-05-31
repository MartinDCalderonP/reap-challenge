import type { Step } from '@/types'

interface StepProgressProps {
  steps: Step[]
  currentStep: number
}

const StepProgress = ({ steps, currentStep }: StepProgressProps) => (
  <nav className='flex justify-center items-center mb-10 mt-2'>
    {steps.map(({ title, subtitle }, index) => (
      <div key={title} className='flex items-center'>
        <div className='flex flex-col items-center min-w-[160px]'>
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mb-1 ${
              index === currentStep
                ? 'border-green-800 bg-green-50'
                : 'border-gray-300 bg-white'
            }`}
          >
            <span
              className={`w-3 h-3 rounded-full ${
                index === currentStep ? 'bg-green-800' : 'bg-gray-300'
              }`}
            />
          </div>
          <span
            className={`text-xs md:text-sm text-center ${
              index === currentStep
                ? 'text-green-800 font-semibold'
                : 'text-gray-700'
            }`}
          >
            {title}
          </span>
          <span className='text-xs text-gray-400 text-center mt-0.5'>
            {subtitle}
          </span>
        </div>
        {index < steps.length - 1 && (
          <div className='w-10 h-0.5 bg-gray-300 mx-2' />
        )}
      </div>
    ))}
  </nav>
)

export default StepProgress
