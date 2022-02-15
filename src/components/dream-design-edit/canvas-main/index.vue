<!-- 中间画布 -->
<template>
    <draggable
      style="width: 100%;height: 100%;"
      handle=".can-move"
      :list="props.doneComponents"
      group="design-group"
      @change="log"
      item-key="id"
      ghost-class="ghost"
    >
      <template #item="{ element }">
        <render-component :leftDragDomInfo="element" @contextmenuEvent="(e:MouseEvent) => emit('contextmenuEvent',e)"></render-component>
      </template>
    </draggable>
</template>
<script setup lang="ts">
import { computed, effect, inject, PropType, reactive, ref, watch, watchEffect } from 'vue';
import draggable from 'vuedraggable/src/vuedraggable';
// import { useStore } from 'vuex';
import { IDoneComponent } from '../../../model/model';
import RenderComponent from '../render-component/index.vue';
import { ElButton } from "element-plus";
import { Delete, CopyDocument } from '@element-plus/icons-vue';
const props = defineProps({
  doneComponents: {
    type: Object as PropType<IDoneComponent[]>,
    default: []
  }
});
const emit = defineEmits(['contextmenuEvent']);
const select_component_info = inject<IDoneComponent>('select_component_info');
// const deleteSelectCompont = inject<(evt: MouseEvent) => any>('deleteSelectCompont');
// const copySelectCompont = inject<(evt: MouseEvent) => any>('copySelectCompont');
// const store = useStore();
// const doneComponents = ref<IDoneComponent[]>([]);
// const doneComponents = reactive<IStoreDoneComponent[]>([]);
const log = (e: any) => {
}
</script>
<style lang="less" scoped>
@import "../../../assets/global.module";
.dragArea {
  width: 100%;
  height: 100%;
  margin: 8px 0px 0px;
}
</style>