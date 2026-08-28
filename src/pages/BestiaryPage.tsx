import { useState } from "react";
import { Button, Card, Empty, Form, Input, Modal, Select, Tag } from "antd";
import { BugOutlined, PlusOutlined } from "@ant-design/icons";
import { usePersistentState } from "../usePersistentState";

type Monster = { id: string; title: string; url: string; difficulty: string; tags: string; reason: string; defeated: boolean };

export default function BestiaryPage() {
  const [monsters, setMonsters] = usePersistentState<Monster[]>("study_tracker_monsters", []);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const add = () => form.validateFields().then((values) => {
    setMonsters((items) => [{ ...values, id: String(Date.now()), defeated: false }, ...items]);
    setOpen(false);
    form.resetFields();
  });
  const toggle = (id: string) => setMonsters((items) => items.map((monster) => monster.id === id ? { ...monster, defeated: !monster.defeated } : monster));

  return <main className="page-shell">
    <section className="section-heading"><div><span className="eyebrow">MONSTER BESTIARY</span><h1>怪物图鉴</h1><p>把不会的题留下来，以后再回来复仇。</p></div><Button type="primary" icon={<PlusOutlined/>} onClick={() => setOpen(true)}>收录怪物</Button></section>
    {monsters.length === 0 ? <Card><Empty description="图鉴还是空的，遇到卡住的算法题就收录进来"/></Card> : <div className="collection-grid">{monsters.map((monster) => <Card key={monster.id} className={monster.defeated ? "collection-card is-complete" : "collection-card"}>
      <div className="card-tags"><Tag color={monster.difficulty === "困难" ? "red" : monster.difficulty === "中等" ? "orange" : "green"}>{monster.difficulty}</Tag></div>
      <BugOutlined className="collection-icon"/><h2>{monster.title}</h2><p><b>知识点：</b>{monster.tags || "待补充"}</p><p><b>上次败因：</b>{monster.reason}</p>
      <div className="card-actions"><Button href={monster.url} target="_blank">再战一次</Button><Button type="primary" onClick={() => toggle(monster.id)}>{monster.defeated ? "重新标记" : "已击败"}</Button></div>
    </Card>)}</div>}
    <Modal title="收录一只新怪物" open={open} onOk={add} onCancel={() => setOpen(false)} okText="加入图鉴" cancelText="取消"><Form form={form} layout="vertical" initialValues={{ difficulty: "中等" }}>
      <Form.Item name="title" label="题目名称" rules={[{ required: true }]}><Input/></Form.Item>
      <Form.Item name="url" label="题目链接" rules={[{ required: true, type: "url" }]}><Input/></Form.Item>
      <Form.Item name="difficulty" label="难度"><Select options={["简单", "中等", "困难"].map((value) => ({ value, label: value }))}/></Form.Item>
      <Form.Item name="tags" label="知识点"><Input placeholder="数组、双指针、动态规划…"/></Form.Item>
      <Form.Item name="reason" label="为什么没做出来" rules={[{ required: true }]}><Input.TextArea rows={3}/></Form.Item>
    </Form></Modal>
  </main>;
}
