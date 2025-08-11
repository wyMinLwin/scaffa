#!/usr/bin/env node

import { validate } from '../lib/validator.js';

// console.log('Hello from support-scaffa!');
// console.log(process.env.npm_lifecycle_event);

await validate();
