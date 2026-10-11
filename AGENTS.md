<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep story pools and random attempt generation in a browser-safe library separate from the quiz UI, so quiz rules can be tested without rendering.
- Apply theme switching through the document's dark class and semantic CSS tokens; browser-only preference storage is read after hydration to keep server rendering safe.
