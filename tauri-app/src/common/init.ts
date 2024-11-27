import { computed, reactive, ref } from "vue";

export const useInitTable = (opt = {}) => {
    let searchForm = null;
    let resetSearchForm = null;
    //@ts-ignore
    if(opt.searchForm) {
        //@ts-ignore
        searchForm = reactive({ ...opt.searchForm })
        //@ts-ignore
        resetSearchForm = () => {
            console.log("is success" + JSON.stringify(searchForm))
            //@ts-ignore
            for(const key in opt.searchForm) {
                //@ts-ignore
                searchForm[key] = opt.searchForm[key]
            }
            getData()
        }
    }
    const loading = ref(false)
    const tableData = ref([])
    const total = ref(1)
    const currentPage = ref(1)
    const limit = ref(10)
    const getData = async (p = null) => {
        if(typeof p == "number") {
            currentPage.value = p
        }
        loading.value = true
        //@ts-ignore
        await opt.getList(searchForm).then((res) => {
            //@ts-ignore
            if (opt.onGetListSuccess && typeof opt.onGetListSuccess == "function") {
                //@ts-ignore
                opt.onGetListSuccess(res)
            } else {
                tableData.value = res
            }
        }).finally(() => {
            loading.value = false
        })
    }

    getData()

    // delete notification by backend
    const handleDelete = (id) => {
        //@ts-ignore
        opt.delete(id).then(res => {
            console.log("delete" + res)
        })
    }
    const handleStatusChange = (status, row) => {
        row.statusLoading = true
        console.log(status)
        //@ts-ignore
        opt.updateStatus(row.id, status).then(res => {

        })
    }

    const errorHandler = () => {

    }

    return {
        searchForm,
        tableData,
        total,
        currentPage,
        limit,
        resetSearchForm,
        getData,
        handleStatusChange,
        handleDelete,
        errorHandler
    }
}
export const useInitForm = (opt = {}) => {
    const drawerRef = ref(null)
    //@ts-ignore
    const defaultForm = opt.form
    const formRef = ref(null)
    const form = reactive({})
    const editId = ref(0)
    const drawerTitle = computed(() => editId.value ? "修改" : "新增")
    //@ts-ignore
    const rules = opt.rules || {}
    const resetForm = (row = false) => {
        //@ts-ignore
        if(formRef.value) formRef.value.clearValidate()
        for(const key in defaultForm) {
            form[key] = row[key]
        }
    }
    const handleSubmit = () => {
        //@ts-ignore
        formRef.value.validate((valid) => {
            if (!valid) return
            //@ts-ignore
            drawerRef.value.showLoading()
            //todo
            const fun = editId.value ? "此处todo更新方法" : "此处todo新建方法"
            //@ts-ignore
            drawerRef.value.hideLoading()
            //@ts-ignore
            drawerRef.value.close()
        })
    }

    const handleEdit = (row) => {
        editId.value = row.id
        resetForm(row)
        //@ts-ignore
        drawerRef.value.open()
    }

    const handleCreate = () => {
        editId.value = 0
        //@ts-ignore
        resetForm(defaultForm)
        //@ts-ignore
        drawerRef.value.open()
    }

    return {
        drawerRef,
        formRef,
        form,
        editId,
        drawerTitle,
        rules,
        resetForm,
        handleSubmit,
        handleEdit,
        handleCreate,
    }
}