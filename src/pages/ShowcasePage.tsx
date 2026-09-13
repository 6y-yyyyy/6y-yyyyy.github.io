import { useState } from "react";
import { Button, Card, Empty, Form, Input, InputNumber, Modal, Tag } from "antd";
import {
  EditOutlined,
  GithubOutlined,
  GlobalOutlined,
  PlusOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { usePersistentState } from "../usePersistentState";

type Project = {
  id: string;
  name: string;
  description: string;
  stack: string;
  repo?: string;
  demo?: string;
  challenge: string;
  aiLevel: number;
  next: string;
};

type ProjectFormValues = Omit<Project, "id">;

export default function ShowcasePage() {
  const [projects, setProjects] = usePersistentState<Project[]>("study_tracker_projects", []);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm<ProjectFormValues>();

  const openAddModal = () => {
    setEditingId(null);
    form.resetFields();
    form.setFieldsValue({ aiLevel: 2 });
    setOpen(true);
  };

  const openEditModal = (project: Project) => {
    const { id, ...values } = project;
    setEditingId(id);
    form.setFieldsValue(values);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditingId(null);
    form.resetFields();
  };

  const save = () =>
    form.validateFields().then((values) => {
      if (editingId) {
        setProjects((items) =>
          items.map((project) =>
            project.id === editingId ? { ...project, ...values } : project,
          ),
        );
      } else {
        setProjects((items) => [{ ...values, id: String(Date.now()) }, ...items]);
      }
      closeModal();
    });

  return (
    <main className="page-shell">
      <section className="section-heading">
        <div>
          <span className="eyebrow">PROJECT TROPHY ROOM</span>
          <h1>作品陈列柜</h1>
          <p>真正的等级证明，不是看过什么，而是独立交付过什么。</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
          添加作品
        </Button>
      </section>

      {projects.length === 0 ? (
        <Card><Empty description="完成第一个实战项目后，把它摆进陈列柜吧" /></Card>
      ) : (
        <div className="collection-grid">
          {projects.map((project) => (
            <Card key={project.id} className="collection-card">
              <ProjectOutlined className="collection-icon" />
              <Tag>AI 参与度 L{project.aiLevel}</Tag>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <p><b>技术栈：</b>{project.stack}</p>
              <p><b>最大难点：</b>{project.challenge}</p>
              <p><b>下一版：</b>{project.next}</p>
              <div className="card-actions">
                {project.repo && <Button icon={<GithubOutlined />} href={project.repo} target="_blank">源码</Button>}
                {project.demo && <Button type="primary" icon={<GlobalOutlined />} href={project.demo} target="_blank">在线体验</Button>}
                <Button icon={<EditOutlined />} onClick={() => openEditModal(project)}>编辑</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        title={editingId ? "编辑作品" : "添加一件新作品"}
        open={open}
        onOk={save}
        onCancel={closeModal}
        okText={editingId ? "保存修改" : "放入陈列柜"}
        cancelText="取消"
      >
        <Form form={form} layout="vertical" initialValues={{ aiLevel: 2 }}>
          <Form.Item name="name" label="项目名称" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="description" label="一句话介绍" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="stack" label="技术栈" rules={[{ required: true }]}><Input placeholder="React、TypeScript、Ant Design" /></Form.Item>
          <Form.Item name="repo" label="GitHub 地址"><Input /></Form.Item>
          <Form.Item name="demo" label="在线体验地址"><Input /></Form.Item>
          <Form.Item name="challenge" label="最大难点" rules={[{ required: true }]}><Input.TextArea /></Form.Item>
          <Form.Item name="aiLevel" label="AI 参与度（1–3）"><InputNumber min={1} max={3} /></Form.Item>
          <Form.Item name="next" label="下一版计划" rules={[{ required: true }]}><Input /></Form.Item>
        </Form>
      </Modal>
    </main>
  );
}
