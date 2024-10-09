import standard from 'eslint-plugin-standard'
import promise from 'eslint-plugin-promise'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [{
  ignores: ['**/js/gmaps.init.js', '**/*.min.js', '**/owl.*.js', '**/jquery.*.js', '**/hpneo.*.js']
}, ...compat.extends('standard'), {
  plugins: {
    standard,
    promise
  },
  languageOptions: {
    globals: {
      ...globals.jquery
    }
  }
}]
