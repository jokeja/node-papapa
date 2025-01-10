
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
    if (item.required) {
      return `${key}: [
          {
            required: true,
            validator: (r, v, c) => {
              if(!v){
                return c('请补充信息')
              }
              c()
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

let formInfo = {
  fi活动名称: {
    required: true,
    components: {
      Input: {}
    }
  },
  fi活动类型: {
    required: true,
    components: {
      PlusSelect: {}
    }
  },
  fi活动时间: {
    required: true,
    components: {
      BeginEndDatePicker: {}
    }
  },
  fi集合地点: {
    required: true,
    components: {
      Input: {}
    }
  },
  fi退款政策: {
    required: true,
    components: {
      PlusSelect: {}
    }
  },
  fi活动主办商家: {
    required: true,
    components: {
      Input: {}
    }
  },
  fi活动门票: {
    required: true,
    components: {
      Input: {}
    }
  },
  fi活动海报: {
    required: true,
    components: {
      UploadFileSingle: {
        children: {
          p: {
            props: {
              slot: 'tips'
            },
            innerHtml: '需上传1张5M内的JPG/PNG图片，建议尺寸750*430px;'
          }
        }
      }
    }
  },
  fi活动页主图: {
    required: true,
    components: {
      UploadFileSingle: {
        children: {
          p: {
            props: {
              slot: 'tips'
            },
            innerHtml: '需上传1张5M内的JPG/PNG图片，建议尺寸750*430px;'
          }
        }
      }
    }
  },
  fi活动说明: {
    required: true,
    components: {
      Input: {
        props: {
          type: 'textarea'
        }
      }
    }
  },
  fi活动详情图: {
    components: {
      UploadFile: {
        props: {
          maxUploadFiles: 5
        },
        children: {
          p: {
            props: {
              slot: 'tips'
            },
            innerHtml: '支持上传5张5M内的JPG/PNG图片，建议宽度750px，高度不限'
          }
        }
      }
    }
  },
  fi报名成功进群图: {
    components: {
      UploadFileSingle: {
        children: {
          p: {
            props: {
              slot: 'tips'
            },
            innerHtml: '支持上传1张JPG/PNG格式的加群二维码'
          }
        }
      }
    }
  }
}
convertObjToFormItem(formInfo)
genRules(formInfo)