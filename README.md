# Tasks

A one-page, day-by-day task list: https://stephengray89-source.github.io/tasks/

- Type a task and press Enter; the box stays ready for the next one.
- Drag tasks between days or into Later (press and hold on a phone).
- Anything not done carries over to today automatically.

The page holds no tasks itself. They live in the private repo `stephengray89-source/tasks-data`,
read and written through the GitHub API with a fine-grained token that each device stores
locally (Contents: read and write, on that one repo only). Without a token it works on the
one device only.

Files: `index.html` (the whole app), `sortable.min.js` (SortableJS 1.15.6, MIT, for drag and
drop), icons and a web manifest so it can be added to a phone's home screen.
