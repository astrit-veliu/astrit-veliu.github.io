const commands = new Map();

export const defineCommand = (id, definition) => {
  commands.set(id, { id, ...definition });
};

export const runCommand = (id, argument) => commands.get(id)?.run(argument);

export const getCommand = (id) => commands.get(id);

export const listCommands = (predicate = () => true) => [...commands.values()].filter(predicate);
