export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style (formatting, semicolons, etc.)
        'refactor', // Code refactoring
        'perf', // Performance improvements
        'test', // Adding/updating tests
        'build', // Build system or dependencies
        'ci', // CI configuration
        'chore', // Maintenance tasks
        'revert', // Revert previous commit
      ],
    ],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 100],
  },
};
