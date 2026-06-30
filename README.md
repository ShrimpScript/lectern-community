# Lectern Community Hub

Reusable skills for [Lectern](https://github.com/ShrimpScript/lectern).

## How it works

- `index.json` lists every skill (the browse metadata).
- `skills/<id>.json` is the full skill — a portable `SkillBundle`.

Lectern's **Marketplace → Community** tab reads this repo over HTTPS (no auth).
Installing always **shows you the skill's exact rules and steps first** — nothing
is added to your brain or run without your review.

## Publishing a skill

In Lectern, open a skill under **My skills** and click **Publish**. That opens a
prefilled "new file" page here — click **Propose new file** to open a pull
request. Add a matching row to `index.json` in the same PR.

## Skill format

`skills/<id>.json`:

```json
{ "name": "...", "description": "...", "triggers": ["..."],
  "rules": ["..."], "steps": ["..."], "author": "you", "version": 1 }
```

`index.json` row:

```json
{ "id": "<id>", "name": "...", "description": "...", "triggers": ["..."],
  "author": "you", "version": 1, "kind": "instruction" }
```

`kind` is `instruction` (rules/steps for the agent) or `gui` (a recorded replay
of literal clicks/keystrokes — review these especially carefully).
