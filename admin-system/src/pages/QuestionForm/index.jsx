import { ProFormTextArea } from '@ant-design/pro-components';
import RichEditor from '@/components/RichEditor';

export default () => {
  return (
    <ProForm
      onFinish={async (values) => {
        await createQuestion(values);
        message.success('提交成功');
      }}
    >
      <ProFormTextArea name="title" label="题目内容" rules={[{ required: true }]} />
      <ProForm.Item name="analysis" label="题目解析">
        <RichEditor />
      </ProForm.Item>
    </ProForm>
  );
}; 