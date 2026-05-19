import { CommandBar } from "./CommandBar";

export default {
  title: "Components/CommandBar",
};

const handleCreate = () => {};

const handleDelete = () => {};

export const Default = () => (
  <CommandBar.Root>
    <CommandBar.Input />
    <CommandBar.List>
      <CommandBar.Empty>No results found.</CommandBar.Empty>

      <CommandBar.Group heading="Actions">
        <CommandBar.Item onClick={handleCreate}>
          Create New Project
        </CommandBar.Item>
        <CommandBar.Item onClick={handleDelete}>Delete Project</CommandBar.Item>
        <CommandBar.Item onClick={handleDelete}>Find Project</CommandBar.Item>
        <CommandBar.Item onClick={handleDelete}>
          Edit Existing Project
        </CommandBar.Item>
      </CommandBar.Group>
      <CommandBar.Separator />
      <CommandBar.Group heading="Solutions">
        <CommandBar.Item onClick={handleCreate}>
          Creating New Projects
        </CommandBar.Item>
        <CommandBar.Item onClick={handleDelete}>
          Deleting Projects
        </CommandBar.Item>
        <CommandBar.Item onClick={handleDelete}>
          Finding Projects
        </CommandBar.Item>
        <CommandBar.Item onClick={handleDelete}>
          Editing Existing Projects
        </CommandBar.Item>
      </CommandBar.Group>
    </CommandBar.List>
  </CommandBar.Root>
);
