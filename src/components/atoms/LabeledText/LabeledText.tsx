import { Textarea } from '@components/shadcn/ui/textarea';

interface Props {
  label: string;
  text: string | number;
}

export const LabeledText = ({ label, text }: Props) => {
  return (
    <div className={'flex m-2'}>
      <p className={'pr-2 py-1 w-20 text-right'}>{label}:</p>
      <Textarea value={text} className={'min-h-1'} disabled />
    </div>
  );
};

export default LabeledText;
