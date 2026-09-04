import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./button";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Button is the action primitive for the portfolio design system. Use a native button by default and asChild only when another semantic element is required."
      }
    }
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "outline", "destructive", "link"]
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "icon", "icon-sm", "icon-lg"]
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" }
  },
  args: {
    children: "View case",
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button iconStart={<PlusIcon />}>Create</Button>
      <Button variant="secondary" iconEnd={<ArrowIcon />}>View case</Button>
      <Button size="icon" aria-label="Create item" iconStart={<PlusIcon />} />
    </div>
  )
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Saving"
  }
};

export const AsLink: Story = {
  render: () => (
    <Button asChild iconEnd={<ArrowIcon />}>
      <a href="#case">Open project</a>
    </Button>
  )
};
