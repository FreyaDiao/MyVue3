import {
    // create naive ui
    create,
    // component
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NMenu,
    NLayoutContent,
    NLayoutFooter,
    NInput,
    NButton,
    NIcon,
    NDropdown,
    NForm,
    NFormItem,
} from 'naive-ui'

const naiveUI = create({
    components: [
        NConfigProvider,
        NLayout,
        NLayoutHeader,
        NLayoutSider,
        NMenu,
        NLayoutContent,
        NLayoutFooter,
        NInput,
        NButton,
        NIcon,
        NDropdown,
        NForm,
        NFormItem,
    ]
})

export default naiveUI