import { IOption } from "../../types/option";

export default function OptionComponent({
	option,
	index,
	questionNumber,
	handleOptionClick,
}: {
	option: IOption;
	index: number;
	questionNumber: string;
	handleOptionClick: (optionValue: string, index: number) => void;
}) {
	return (
		<div className='form-control'>
			<div
				className={`label cursor-pointer w-4/5 lg:w-[420px] mx-auto 
										h-20 bg-neutral rounded-xl
										flex justify-start px-6 items-center my-2
										${option.selected ? 'border-2 border-success' : ''}`}
				onClick={() => handleOptionClick(option.value, index)}
			>
				<input
					key={'random' + index + questionNumber}
					type='checkbox'
					onChange={() => {}}
					checked={option.selected}
					className='checkbox checkbox-success accent-white mr-2 rounded-full'
				/>
				<span className='label-text'>{option.value}</span>
			</div>
		</div>
	);
}
