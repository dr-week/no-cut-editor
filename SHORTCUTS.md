# Shortcut Registry

## Core keyboard system
This project keeps shortcuts centralized so they can be customized without scattering logic across UI files.

| Action | Shortcut | Category |
| --- | --- | --- |
| Select tool | V | Timeline |
| Split clip | C | Timeline |
| Mark in | I | Timeline |
| Mark out | O | Timeline |
| Play / pause | Space | Transport |
| Shuttle back | J | Transport |
| Stop playback | K | Transport |
| Shuttle forward | L | Transport |
| Undo | Ctrl+Z | Edit |
| Redo | Ctrl+Shift+Z | Edit |
| Duplicate | Ctrl+D | Edit |
| Delete | Delete | Edit |
| Ripple delete | Shift+Delete | Edit |
| Command search | Ctrl+K / / | General |
| Save project | Ctrl+S | Project |

## Design principle
Shortcuts should be registered centrally, mapped to commands, and resolved at the editor state layer rather than hardcoded in many individual components.
