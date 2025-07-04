/**
 * @author Thomasan1999
 * See LICENSE file in root directory for full license.
 */
'use strict'

const RuleTester = require('../../eslint-compat').RuleTester
const rule = require('../../../lib/rules/prefer-use-template-ref')

const tester = new RuleTester({
  languageOptions: {
    parser: require('vue-eslint-parser'),
    ecmaVersion: 2020,
    sourceType: 'module'
  }
})

tester.run('prefer-use-template-ref', rule, {
  valid: [
    {
      filename: 'single-use-template-ref.vue',
      code: `
      <template>
          <div ref="root" />
      </template>
      <script setup>
        import { useTemplateRef } from 'vue';
        const root = useTemplateRef('root');
      </script>
      `
    },
    {
      filename: 'multiple-use-template-refs.vue',
      code: `
      <template>
          <button ref="button">Content</button>
          <a href="" ref="link">Link</a>
      </template>
      <script setup>
        import { useTemplateRef } from 'vue';
        const buttonRef = useTemplateRef('button');
        const link = useTemplateRef('link');
      </script>
      `
    },
    {
      filename: 'use-template-ref-in-block.vue',
      code: `
      <template>
          <div>
            <ul>
              <li ref="firstListItem">Morning</li>
              <li>Afternoon</li>
              <li>Evening</li>
            </ul>
          </div>
      </template>
      <script setup>
        import { useTemplateRef } from 'vue';
        function getFirstListItemElement() {
          const firstListItem = useTemplateRef('firstListItem')
          console.log(firstListItem)
        }
      </script>
      `
    },
    {
      filename: 'non-template-ref.vue',
      code: `
      <template>
          <div>
            <ul>
              <li v-for="food in foods" :key="food">{{food}}</li>
            </ul>
          </div>
      </template>
      <script setup>
        import { ref } from 'vue';
        const foods = ref(['Spaghetti', 'Pizza', 'Cake']);
      </script>
      `
    },
    {
      filename: 'counter.js',
      code: `
      import { ref } from 'vue';
      const counter = ref(0);
      const names = ref(new Set());
      function incrementCounter() {
        counter.value++;
        return counter.value;
      }
      function storeName(name) {
        names.value.add(name)
      }
      `
    },
    {
      filename: 'setup-function.vue',
      code: `
      <template>
        <p>Button clicked {{counter}} times.</p>
        <button ref="button" @click="counter++">Click</button>
      </template>
      <script>
        import { ref, useTemplateRef } from 'vue';
        export default {
          name: 'Counter',
          setup() {
            const counter = ref(0);
            const button = useTemplateRef('button');
          }
        }
      </script>
      `
    },
    {
      filename: 'options-api-no-refs.vue',
      code: `
      <template>
        <label ref="label">
          Name:
          <input v-model="name" />
        </label>
        <p ref="textRef">{{niceName}}</p>
        <button
      </template>
      <script>
        import { ref } from 'vue';
        export default {
          name: 'NameRow',
          methods: {
            someFunction() {
              return {
                label: ref(5),
              }
            }
          }
          data() {
            return {
              label: 'label',
              name: ''
            }
          },
          computed: {
            niceName() {
              return 'Nice ' + this.name;
            }
          }
        }
      </script>
      `
    },
    {
      filename: 'options-api-mixed.vue',
      code: `
      <template>
        <label ref="labelElem">
          Name:
          <input v-model="name" />
        </label>
        {{ loremIpsum }}
      </template>
      <script>
        import { ref } from 'vue';
        export default {
          name: 'NameRow',
          props: {
            defaultLabel: {
              type: String,
            },
          },
          data() {
            return {
              label: ref(this.defaultLabel),
              labelElem: ref(),
              name: ''
            }
          },
          computed: {
            loremIpsum() {
              return this.name + ' lorem ipsum'
            }
          }
        }
      </script>
      `
    },
    {
      filename: 'template-ref-function.vue',
      code: `
      <template>
        <button :ref="ref => button = ref">Content</button>
      </template>
      <script setup>
        import { ref } from 'vue';
        const button = ref();
        </script>
      `
    },
    {
      filename: 'ref-in-block.vue',
      code: `
      <template>
          <div>
            <ul>
              <li ref="firstListItem">Morning</li>
              <li ref="second">Afternoon</li>
              <li>Evening</li>
            </ul>
          </div>
      </template>
      <script setup>
        import { ref, shallowRef } from 'vue';
        function getFirstListItemElement() {
          const firstListItem = ref();
          const nestedCallback = () => {
            const second = shallowRef();
            console.log(second);
          }
          nestedCallback();
        }
      </script>
      `
    },
    {
      filename: 'ref-in-block-setup-fn.vue',
      code: `
      <template>
          <div>
            <ul>
              <li ref="firstListItem">Morning</li>
              <li ref="second">Afternoon</li>
              <li>Evening</li>
            </ul>
          </div>
      </template>
      <script>
        import { ref, shallowRef } from 'vue';
        export default {
          name: 'ComponentWithRefInBlock',
          setup() {
            function getFirstListItemElement() {
              const firstListItem = shallowRef();
              const nestedCallback = () => {
                const second = ref();
                console.log(second);
              }
              nestedCallback();
            }
          }
        }
      </script>
      `
    },
    {
      filename: 'non-block-arrow-setup-function.vue',
      code: `
        <script>
          import { defineComponent } from 'vue';
          export default defineComponent({
            setup: () => ({})
          })
        </script>
      `
    },
    {
      filename: 'multiple-scripts-setup-first.vue',
      code: `
      <template>
        <div ref="root" :data-a="A" />
      </template>

      <script setup>
      import { useTemplateRef } from 'vue'
      const root = useTemplateRef('root')
      </script>

      <script>
      const A = 'foo'
      </script>
      `
    },
    {
      filename: 'multiple-scripts-setup-last.vue',
      code: `
      <template>
        <div ref="root" :data-a="A" />
      </template>

      <script>
      const A = 'foo'
      </script>

      <script setup>
      import { useTemplateRef } from 'vue'
      const root = useTemplateRef('root')
      </script>
      `
    }
  ],
  invalid: [
    {
      filename: 'single-ref.vue',
      code: `
      <template>
          <div ref="root"/>
      </template>
      <script setup>
        import { ref } from 'vue';
        const root = ref();
      </script>
      `,
      output: `
      <template>
          <div ref="root"/>
      </template>
      <script setup>
        import { ref, useTemplateRef } from 'vue';
        const root = useTemplateRef('root');
      </script>
      `,
      errors: [
        {
          messageId: 'preferUseTemplateRef',
          data: {
            name: 'ref'
          },
          line: 7,
          column: 22
        }
      ]
    },
    {
      filename: 'one-ref-unused-in-script.vue',
      code: `
      <template>
          <button ref="button">Content</button>
          <a href="" ref="link">Link</a>
      </template>
      <script setup>
        import { ref } from 'vue';
        const buttonRef = ref();
        const link = ref();
      </script>
      `,
      output: `
      <template>
          <button ref="button">Content</button>
          <a href="" ref="link">Link</a>
      </template>
      <script setup>
        import { ref, useTemplateRef } from 'vue';
        const buttonRef = ref();
        const link = useTemplateRef('link');
      </script>
      `,
      errors: [
        {
          messageId: 'preferUseTemplateRef',
          data: {
            name: 'ref'
          },
          line: 9,
          column: 22
        }
      ]
    },
    {
      filename: 'multiple-refs.vue',
      code: `
      <template>
          <h1 ref="heading">Heading</h1>
          <a href="" ref="link">Link</a>
      </template>
      <script setup>
        import { ref } from 'vue';
        const heading = ref();
        const link = ref();
      </script>
      `,
      output: `
      <template>
          <h1 ref="heading">Heading</h1>
          <a href="" ref="link">Link</a>
      </template>
      <script setup>
        import { ref, useTemplateRef } from 'vue';
        const heading = useTemplateRef('heading');
        const link = useTemplateRef('link');
      </script>
      `,
      errors: [
        {
          messageId: 'preferUseTemplateRef',
          data: {
            name: 'ref'
          },
          line: 8,
          column: 25
        },
        {
          messageId: 'preferUseTemplateRef',
          data: {
            name: 'ref'
          },
          line: 9,
          column: 22
        }
      ]
    },
    {
      filename: 'setup-function-only-refs.vue',
      code: `
      <template>
        <p>Button clicked {{counter}} times.</p>
        <button ref="button">Click</button>
      </template>
      <script>
        import { ref } from 'vue';
        export default {
          name: 'Counter',
          setup() {
            const counter = ref(0);
            const button = ref();
          }
        }
      </script>
      `,
      output: `
      <template>
        <p>Button clicked {{counter}} times.</p>
        <button ref="button">Click</button>
      </template>
      <script>
        import { ref, useTemplateRef } from 'vue';
        export default {
          name: 'Counter',
          setup() {
            const counter = ref(0);
            const button = useTemplateRef('button');
          }
        }
      </script>
      `,
      errors: [
        {
          messageId: 'preferUseTemplateRef',
          data: {
            name: 'ref'
          },
          line: 12,
          column: 28
        }
      ]
    },
    {
      filename: 'single-shallowRef.vue',
      code: `
      <template>
          <div ref="root"/>
      </template>
      <script setup>
        import { shallowRef } from 'vue';
        const root = shallowRef();
      </script>
      `,
      output: `
      <template>
          <div ref="root"/>
      </template>
      <script setup>
        import { shallowRef, useTemplateRef } from 'vue';
        const root = useTemplateRef('root');
      </script>
      `,
      errors: [
        {
          messageId: 'preferUseTemplateRef',
          data: {
            name: 'shallowRef'
          },
          line: 7,
          column: 22
        }
      ]
    },
    {
      filename: 'block-arrow-setup-function.vue',
      code: `
      <template>
        <button ref="button">Click</button>
      </template>
      <script>
        import { ref } from 'vue';
        export default {
          setup: () => {
            const button = ref();
          }
        }
      </script>
      `,
      output: `
      <template>
        <button ref="button">Click</button>
      </template>
      <script>
        import { ref, useTemplateRef } from 'vue';
        export default {
          setup: () => {
            const button = useTemplateRef('button');
          }
        }
      </script>
      `,
      errors: [
        {
          messageId: 'preferUseTemplateRef',
          data: {
            name: 'ref'
          },
          line: 9,
          column: 28
        }
      ]
    },
    {
      filename: 'multiple-scripts-setup-first.vue',
      code: `
      <template>
        <div ref="root" :data-a="A" />
      </template>

      <script setup>
      import { ref } from 'vue'
      const root = ref()
      </script>

      <script>
      const A = 'foo'
      </script>
      `,
      output: `
      <template>
        <div ref="root" :data-a="A" />
      </template>

      <script setup>
      import { ref, useTemplateRef } from 'vue'
      const root = useTemplateRef('root')
      </script>

      <script>
      const A = 'foo'
      </script>
      `,
      errors: [
        {
          messageId: 'preferUseTemplateRef',
          data: {
            name: 'ref'
          },
          line: 8,
          column: 20
        }
      ]
    },
    {
      filename: 'multiple-scripts-setup-last.vue',
      code: `
      <template>
        <div ref="root" :data-a="A" />
      </template>

      <script>
      const A = 'foo'
      </script>

      <script setup>
      import { ref } from 'vue'
      const root = ref()
      </script>
      `,
      output: `
      <template>
        <div ref="root" :data-a="A" />
      </template>

      <script>
      const A = 'foo'
      </script>

      <script setup>
      import { ref, useTemplateRef } from 'vue'
      const root = useTemplateRef('root')
      </script>
      `,
      errors: [
        {
          messageId: 'preferUseTemplateRef',
          data: {
            name: 'ref'
          },
          line: 12,
          column: 20
        }
      ]
    },
    {
      filename: 'missing-import.vue',
      code: `
      <template>
        <p>Button clicked {{counter}} times.</p>
        <button ref="button">Click</button>
      </template>
      <script>
        import { isEqual } from 'lodash';
        export default {
          name: 'Counter',
          setup() {
            const counter = ref(0);
            if (isEqual(counter.value, 0)) {
              console.log('Counter is reset');
            }
            const button = ref();
          }
        }
      </script>
      `,
      output: `
      <template>
        <p>Button clicked {{counter}} times.</p>
        <button ref="button">Click</button>
      </template>
      <script>
        import { isEqual } from 'lodash';
        import { useTemplateRef } from 'vue';
        export default {
          name: 'Counter',
          setup() {
            const counter = ref(0);
            if (isEqual(counter.value, 0)) {
              console.log('Counter is reset');
            }
            const button = useTemplateRef('button');
          }
        }
      </script>
      `,
      errors: [
        {
          messageId: 'preferUseTemplateRef',
          data: {
            name: 'ref'
          },
          line: 15,
          column: 28
        }
      ]
    },
    {
      filename: 'no-imports.vue',
      code: `
      <template>
        <p>Button clicked {{counter}} times.</p>
        <button ref="button">Click</button>
      </template>
      <script>
        export default {
          name: 'Counter',
          setup() {
            const counter = ref(0);
            const button = ref();
          }
        }
      </script>
      `,
      output: `
      <template>
        <p>Button clicked {{counter}} times.</p>
        <button ref="button">Click</button>
      </template>
      <script>
        import { useTemplateRef } from 'vue';
        export default {
          name: 'Counter',
          setup() {
            const counter = ref(0);
            const button = useTemplateRef('button');
          }
        }
      </script>
      `,
      errors: [
        {
          messageId: 'preferUseTemplateRef',
          data: {
            name: 'ref'
          },
          line: 11,
          column: 28
        }
      ]
    },
    {
      filename: 'script-lang-ts.vue',
      code: `
      <template>
        <p>Button clicked {{counter}} times.</p>
        <button ref="button">Click</button>
      </template>
      <script lang="ts">
        export default {
          name: 'Counter',
          setup() {
            const counter = ref(0);
            const button = ref<HTMLDivElement>();
          }
        }
      </script>
      `,
      output: `
      <template>
        <p>Button clicked {{counter}} times.</p>
        <button ref="button">Click</button>
      </template>
      <script lang="ts">
        import { useTemplateRef } from 'vue';
        export default {
          name: 'Counter',
          setup() {
            const counter = ref(0);
            const button = useTemplateRef<HTMLDivElement>('button');
          }
        }
      </script>
      `,
      languageOptions: {
        parserOptions: {
          parser: require.resolve('@typescript-eslint/parser')
        }
      },
      errors: [
        {
          messageId: 'preferUseTemplateRef',
          data: {
            name: 'ref'
          },
          line: 11,
          column: 28
        }
      ]
    }
  ]
})
