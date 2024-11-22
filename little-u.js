
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
  let propStr = ''
  if (comp.props) {
    Object.keys(comp.props).forEach(key => {
      const prop = comp.props[key]
      if (typeof prop == 'boolean') {
        propStr += `:${key}="${prop}"`
      }
      else if (typeof prop == 'string') {
        propStr += `${key}="${prop}"`
      } else {
        if (prop.reactive) {
          propStr += `:${key}="${prop.value}"`
        } else {
          propStr += `${key}="${prop.value}"`
        }
      }
    })
  }
  let childrenComps = []
  if (comp.children) {
    childrenComps = comp.children.map(childComp => {
      return createComonent(childComp)
    })
  }
  const vModel = comp.model ? `v-model="${comp.model}"` : ''
  return `<${comp.name} ${vModel} ${propStr}>\n${childrenComps.join('')}${comp.innerHtml || ''}</${comp.name}>\n`
}

function convertObjToFormItem() {
  let aa = {
    fi奖项等级: {
      components: {
        Input: ''
      }
    },
    fi奖项名称: {
      components: {
        Input: ''
      }
    },
    fi奖项数量: {
      Input: ''
    },
    fi奖项封面图片: {
      components: {
        UploadFileSingle: {
          children: [
            {
              name: 'p',
              props: {
                slot: {
                  value: 'tips'
                }
              },
              innerHtml: '建议尺寸：建议上传1:1的奖品封面图，大小不超过1M，格式为：jpg/bmp/png/gif'
            }
          ]
        }
      }
    },
    fi奖品文字介绍: {
      components: {
        Input: {
          props: {
            type: 'textarea'
          }
        }
      }
    },
    fi使用有效期: {
      components: {
        RadioGroup: {
          name: 'RadioGroup',
          children: [
            {
              name: 'Radio',
              props: {
                label: {
                  value: '0',
                  reactive: true
                }
              },
              children: [
                {
                  name: 'span',
                  innerHtml: '不限'
                }
              ]
            },
            {
              name: 'Radio',
              props: {
                label: {
                  value: '1',
                  reactive: true
                }
              },
              children: [
                {
                  name: 'span',
                  innerHtml: '限制'
                }
              ]
            }
          ]
        }
      }
    },
    fi适用商户: {
      components: {
        RadioGroup: {
          name: 'RadioGroup',
          children: [
            {
              name: 'Radio',
              innerHtml: '限本店使用',
              label: 1
            },
            {
              name: 'Radio',
              innerHtml: '指定本商圈内合作商户使用',
              label: 2
            },
            {
              name: 'Radio',
              innerHtml: '指定平台内合作商户使用',
              label: 3
            }
          ]
        },
        span: {
          innerHtml: '指定适用商户',
          props: {
            class: 'click-span'
          }
        },
        PlusTable: {
          props: {
            localPaging: true,
            showSeachButton: false,
            columns: {
              value: 'columns',
              reactive: true
            }
          }
        }
      }
    },
    fi奖项抽中概率: {
      components: {
        Input: { name: 'Input' }

      }
    },
    fi重复中奖限制: {
      components: {
        Input: { name: 'Input' }
      }
    }
  }
  let result = Object.keys(aa).map(key => {
    const item = aa[key]
    let components = []
    if (item.components) {
      components = Object.keys(item.components).map(cKey => {
        const comp = item.components[cKey]
        comp.name = cKey
        if (!comp.model) {
          comp.model = `formInfo.${key}`
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

convertObjToFormItem()