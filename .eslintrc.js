module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended' // or 'plugin:vue/base'
  ],
  plugins: [
    'html'
  ],
  "settings": {
    "html/indent": "0",   // code should start at the beginning of the line (no initial indentation).
    "html/indent": "+2",  // indentation is the <script> indentation plus two spaces.
    "html/indent": "tab", // indentation is one tab at the beginning of the line.
    "html/report-bad-indent": "error",
  },
  rules: {
    // override/add rules' settings here
    'indent': ['error', 2],
    'vue/no-invalid-v-if': 'error'
  }
}
