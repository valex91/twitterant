import { state } from './example-state';
import { giveAwayAction } from './handler';
giveAwayAction(state).then(console.log, console.log)