# Tasks

A one-page, day-by-day task list: https://stephengray89-source.github.io/tasks/

- One box to add tasks. Days in the text are read and removed ("call Ian Thursday",
  "next week", "5 Nov", "in 3 days", "someday"); comma lists become separate tasks;
  a preview shows where each lands. Shift+Enter adds exactly as typed.
- Today is the main list; Upcoming shows only days that have tasks, then Later.
- Drag to reorder or move; day buttons appear at the bottom while dragging.
- Anything not done carries over to today; from 3 days it's marked overdue.

The page holds no tasks itself. They live in the private repo `stephengray89-source/tasks-data`,
read and written through the GitHub API with a fine-grained token that each device stores
locally (Contents: read and write, on that one repo only). Without a token it works on the
one device only.

Files: `index.html` (the whole app), `sortable.min.js` (SortableJS 1.15.6, MIT, for drag and
drop), icons and a web manifest so it can be added to a phone's home screen.
