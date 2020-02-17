<template>
  <div>
    <span :key="actionIndex" v-for="(action, actionIndex) in actions">
      <button
        :class="action.class"
        :title="action.title || ''"
        @click="handleCallback(action.callback, filterObject(data, action.args))"
        v-bind="$attrs"
        v-if="(typeof action.showKey === 'undefined' || action.showKey.length === 0 || action.showWhen.indexOf(data[action.showKey]) !== -1)
                                           && !action.hasOwnProperty('dropdown')"
      >{{ action.text }}</button>

      <div>
        <b-dropdown
          id="dropdown-1"
          :text="action.title"
          :title="action.title || ''"
          
        >
          <b-dropdown-item
            v-for="(dropDown, dropDownIndex) in action.dropdown"
            :key="dropDownIndex"
            :title="dropDown.title || ''"
            @click="handleCallback(dropDown.callback, filterObject(data, dropDown.args))"
          >{{dropDown.text}}</b-dropdown-item>
        </b-dropdown>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: "TableActions",
  props: {
    actions: {
      type: Array,
      default: () => {
        return [];
      }
    },
    data: {
      type: Object
    }
  },
  methods: {
    handleCallback(callback, argument) {
      if (!callback) return;
      this.$emit(callback, ...argument);

    },
    filterObject(haystack, needle = []) {
      // console.log(haystack);
      let data = [];
      if (needle.length === 0 || haystack.length === 0) return [];
      needle.forEach(key => {
        if (haystack.hasOwnProperty(key)) data.push(haystack[key]);
      });
      return data;
    }
  }
};
</script>

<style scoped>
</style>
