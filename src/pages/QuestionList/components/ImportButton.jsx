import { upload } from '@/services/api';

export default () => {
  const handleImport = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await upload('/api/questions/import', formData);
    message.success(`成功导入${res.data.count}条数据`);
  };

  return (
    <Upload 
      accept=".xlsx"
      beforeUpload={handleImport}
    >
      <Button>Excel导入</Button>
    </Upload>
  );
}; 