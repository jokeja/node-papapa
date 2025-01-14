
function excelTitle2Obj() {
  let a =
    '商圈 行业 购票人数 购票次数 购票张数 购票金额 开卡人数 开卡/充值金额 影院页面打开人数'
      .split(/\s/)
      .map((item) => {
        return { title: item, key: '', excel: true }
      })
  JSON.stringify(a)
}


function createComonent(comp) {
  let propArr = []
  if (comp.props) {
    if (comp.name.toLowerCase().indexOf('input') != -1) {
      let propsKey = Object.keys(comp.props)
      if (propsKey.indexOf('placeholder') == -1) {
        comp.props.placeholder = {
          value: ''
        }
      }
    }
    Object.keys(comp.props).forEach(key => {
      const prop = comp.props[key]
      if (typeof prop == 'number') {
        propArr.push(`:${key}="${prop}"`)
      }
      else if (typeof prop == 'boolean') {
        propArr.push(`:${key}="${prop}"`)
      }
      else if (typeof prop == 'string') {
        propArr.push(`${key}="${prop}"`)
      } else {
        if (prop.reactive) {
          propArr.push(`:${key}="${prop.value}"`)
        } else {
          propArr.push(`${key}="${prop.value}"`)
        }
      }
    })
  }
  let childrenComps = []
  if (comp.children) {
    if (comp.children instanceof Array) {
      childrenComps = comp.children.map(childComp => {
        return createComonent(childComp)
      })
    } else if (typeof comp.children == 'object') {
      childrenComps = Object.keys(comp.children).map(childKey => {
        const childComp = comp.children[childKey]
        childComp.name = childKey
        return createComonent(childComp)
      })
    }
  }
  const vModel = comp.model ? `v-model="${comp.model}"` : ''
  const propStr = propArr.join(' ')
  return `<${comp.name} ${vModel} ${propStr}>\n${childrenComps.join('')}${comp.innerHtml || ''}</${comp.name}>\n`
}

function convertObjToFormItem(formInfo) {
  let result = Object.keys(formInfo).map(key => {
    const item = formInfo[key]
    let components = []
    if (item.components) {
      components = Object.keys(item.components).map(cKey => {
        const comp = item.components[cKey]
        comp.name = cKey
        if (!comp.model) {
          comp.model = `formInfo.${key}`
        } else {
          comp.model = `formInfo.${comp.model}`
        }
        let componentStr = createComonent(comp)
        return componentStr
      })
    }
    let itemStr = `<FormItem label="${key.replace('fi', '')}" prop="${key}">\n${components.join('')}\n</FormItem>\n`
    return itemStr
  }).join(` `)
  console.log(result)
}

function genRules(formInfo) {
  console.log('-----rules------\n\n\n')
  let result = Object.keys(formInfo).map(key => {
    const item = formInfo[key]
    const validatorCon = []
    if (item.regular) {
      let condition = []
      if (item.regular.number) {
        let numberCondition = []
        if (item.regular.number.min == 0) {
          numberCondition.push('this.$regular.nonnegativeInteger(v)')
        }
        if (item.regular.number.min == 1) {
          numberCondition.push('this.$regular.isPositiveInteger(v)')
        }
        if (item.regular.number.max) {
          numberCondition.push(`v<=${item.regular.number.max}`)
        }
        condition.push(`if(${numberCondition.join('&&')}){return c()}`)
      }
      let conditionStr = condition.join('\n')
      validatorCon.push(conditionStr)
    }
    const defaultCondigion = `if(v){
                return c()
              }`
    if (item.required || validatorCon.length) {
      return `${key}: [
          {
            required: ${item.required || false},
            validator: (r, v, c) => {
              ${validatorCon.length ? validatorCon.join('') : defaultCondigion}
              c('请设置${key.replace('fi', '')}')
            }
          }
        ]`
    }
    return ''
  }).filter(item => {
    return item.length > 0
  }).join(`,\n`)
  console.log(result)
}

function genDetail(formInfo) {
  let result = Object.keys(formInfo).map(key => {
    const item = formInfo[key]
    let components = []
    if (item.components) {
      components = Object.keys(item.components).map(cKey => {
        const comp = item.components[cKey]
        comp.name = cKey
        if (!comp.model) {
          comp.model = `formInfo.${key}`
        } else {
          comp.model = `formInfo.${comp.model}`
        }
        let componentStr = createComonent(comp)
        return componentStr
      })
    }
    let itemStr = `<FormItem label="${key.replace('fi', '')}">\n<span>{{formInfo.${key}}}</span>\n</FormItem>\n`
    return itemStr
  }).join(` `)
  console.log(result)
}


let formInfo = {
  fi门票名称: {
    required: true,
    components: {
      PlusInput: {
        props: {
          maxlength: 20,
          placeholder: '请输入20字内的门票名称'
        }
      }
    }
  },
  fi门票价格: {
    required: true,
    components: {
      Input: {
        props: {
          placeholder: '请输入20字内的门票名称'
        }
      }
    }
  },
  fi门票数量: {
    required: true,
    regular: {
      number: {
        max: 999999,
        min: 1
      }
    },
    components: {
      Input: {
        props: {
          placeholder: '请输入20字内的门票名称'
        }
      }
    }
  },
  fi开售时间: {
    components: {
      BeginEndDatePicker: {
        props: {
          type: 'single',
          placeholder: '选填，为空则创建活动即支持报名'
        }
      }
    },
  },
  fi报名截止时间: {
    components: {
      BeginEndDatePicker: {
        props: {
          type: 'single',
          placeholder: '选填，为空则活动结束停止报名'
        }
      }
    },
  },
  fi每人限购: {
    components: {
      Input: {
        props: {
          placeholder: '请输入1-999999，不填则不限购'
        }
      }
    },
  },
  fi封面图: {
    components: {
      UploadFileSingle: {
        props: {
          maxUploadFiles: 5
        },
        children: {
          p: {
            props: {
              slot: 'tips'
            },
            innerHtml: '支持上传1张,建议尺寸:300x300px文件格式:png/jpg/gif'
          }
        }
      }
    }
  },
  fi门票说明: {
    components: {
      PlusInput: {
        props: {
          maxlength: 300,
          type: 'textarea',
          placeholder: '请输入300字内的入场门票说明:使用方式、注意事项等'
        }
      }
    }
  }
}
// convertObjToFormItem(formInfo)
genRules(formInfo)
// genDetail(formInfo)