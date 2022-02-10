<template>
    <div class="editor" ref="monacoRef" :id="randomID"></div>
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick, PropType } from 'vue';
import { IMonacoLanguage } from '../../model/model';
import { randomString } from '../../utils';
import { monaco } from './customMonaco';
const props = defineProps({
    code: {
        type: String,
        default: ''
    },
    language: {
        type: String as PropType<IMonacoLanguage>,
        default: IMonacoLanguage.TypeScript
    }
});
const emit = defineEmits(['onDidChangeModelContent']);
const monacoRef = ref<HTMLElement | null>(null);
const randomID = ref(randomString());
let editor: monaco.editor.IStandaloneCodeEditor;
nextTick(() => {
    if (monacoRef.value) {
        editor = monaco.editor.create(monacoRef.value, {
            value: props.code,
            language: props.language,
            automaticLayout: true,
            theme: 'vs-dark'
        });
        editor.onDidChangeModelContent((e) => {
            emit('onDidChangeModelContent', editor.getValue());
        })
    }
});
const disposeEdit = () => {
    editor.dispose();
}
defineExpose({
    disposeEdit
})
</script>
<style>
</style>