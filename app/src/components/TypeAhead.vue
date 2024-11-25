<template>
  <div class="type-ahead">
    <div class="menu__content"
         v-show="showList" @keydown.esc="cancelSelection"
         style="max-height: 300px; position: relative; width: 99%;">
      <div class="card">
        <ul class="list">
          <li v-for="(item, index) in items"
              @click.left.stop.prevent="selectItemByMouse(item)">
            <a class="list__tile"
               :class="getActiveClass(index)">
              <div class="list__tile_content">
                <div class="list__tile__title">
                  {{ item.name }}
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <v-text-field :id="`${id}_input`"
                    :ref="`${id}_input`"
                    :label="label"
                    :hint="$t(hint)"
                    :disabled="disabled"
                    :required="isRequired === true"
                    v-model="query"
                    :rules="getRules"
                    @keyup.native.down.stop.prevent="moveCursorDown"
                    @keyup.native.up.stop.prevent="moveCursorUp"
                    @keyup.native.enter.stop.prevent="selectItem"
                    @keyup.native.esc.stop.prevent="cancelSelection"
                    @keydown.native.tab="tabKeyPressed"
                    @keyup.native="queryChanged"
                    @focus="touch(getId(), $event.target.value, 'focus')">
      </v-text-field>
    </div>
  </div>
</template>

<script>
  import { debounce } from 'underscore';
  import Validation from '../validation/validation.mixin';

  export default {
    name: 'type-ahead',
    props: ['id', 'name', 'label', 'hint', 'disabled', 'isRequired', 'value', 'validation'],
    mixins: [Validation],
    data() {
      return {
        current: -1,
        currentItem: this.value === null ? { id: 0, name: '' } : this.value,
        query: this.value === null ? '' : this.value,
        items: [],
        hideList: false,
      };
    },
    computed: {
      hasItems() {
        return this.items === null ? false : this.items.length > 0;
      },
      showList() {
        return this.hasItems === true && this.hideList === false;
      },
      getRules() {
        return typeof this.validation === 'undefined' ? [] : this.validation.rules;
      },
    },
    methods: {
      getActiveClass(index) {
        return {
          active: this.currentItem.name === this.items[index].name
          || this.current === index,
        };
      },
      moveCursorUp() {
        if (this.current > 0) {
          this.current -= 1;

          return;
        }

        if (this.current === -1) {
          this.current = this.items.length - 1;

          return;
        }

        this.current = -1;
      },
      moveCursorDown() {
        if (this.current < this.items.length - 1) {
          this.current += 1;

          return;
        }

        this.current = -1;
      },
      tabKeyPressed() {
        if (this.showList && this.current !== -1) {
          this.currentItem = this.items[this.current];

          this.$emit('itemSelected', this.currentItem);

          this.query = this.currentItem === null ? '' : this.currentItem.name;
          this.$refs[`${this.id}_input`].value = this.query;
          this.hideList = true;
        }
      },
      selectItem() {
        if (this.$refs[`${this.id}_input`].value === '') {
          this.currentItem = { i: 0, name: '' };
          this.current = -1;

          this.$emit('itemSelected', this.currentItem);

          this.hideList = true;

          return;
        }

        if (this.current !== -1) {
          this.currentItem = this.items[this.current];

          this.$emit('itemSelected', this.currentItem);

          this.query = this.currentItem === null ? '' : this.currentItem.name;
          this.hideList = true;
        }
      },
      selectItemByMouse(item) {
        this.$emit('itemSelected', item);

        this.currentItem = item;
        this.query = this.currentItem.name;
        this.hideList = true;
      },
      cancelSelection() {
        this.query = this.currentItem.name;

        if (this.hasItems) {
          this.items = [];
        }
      },
      getId() {
        return this.id;
      },
      // eslint-disable-next-line
      queryChanged: debounce(function(e) {
        this.touch(this.id, e.target.value, 'focus');

        this.$refs[`${this.id}_input`].validate();

        if (e.length === 0) {
          this.items = [];
          this.hideList = true;

          return;
        }

        if (e.key === 'Escape' || e.key === 'Enter') {
          this.hideList = true;
        }

        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Escape' || e.key === 'Enter') {
          return;
        }

        if (typeof this.currentItem !== 'undefined' && this.currentItem.name === e.target.value) {
          return;
        }

        this.query = e.target.value;

        // eslint-disable-next-line
        console.debug(`typeAhead[${this.id}]: value changed`);

        if (e.target.value.length > 2) {
          this.hideList = false;
          this.items = [];

          // eslint-disable-next-line
          console.debug(`typeAhead[${this.id}]: query changed`);

          this.$emit('fetchData', this.query);
        }
      }, 500),
      setListItems(listItems) {
        this.items = listItems;
      },
      clear() {
        this.$refs[`${this.id}_input`].value = '';
        this.query = '';
        this.selectItem();

        // eslint-disable-next-line
        console.debug(`typeAhead[${this.id}]: query cleared`);
      },
      setValue(value) {
        this.query = value;
      },
      validate() {
        // eslint-disable-next-line
        console.log(`typeAhead[${this.id}]: validating`);

        return this.$refs[`${this.id}_input`].validate();
      },
    },
  };
</script>

<style lang="scss" scoped>
  $theme_primary: #1976D2;
  $divider-percent: 0.12;
  $material-twelve-percent-dark: rgba(#000, $divider-percent);

  .list {
    .list__tile {
      &.active {
        background: $material-twelve-percent-dark;
      }
    }
  }

</style>
