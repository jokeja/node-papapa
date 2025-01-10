let aa = {
  fi主办单位: {
    components: {
      Input: {}
    }
  },
  fi协办单位: {
    components: {
      RadioGroup: {
        children: [
          {
            name: 'Radio',
            props: {
              label: 0,
            },
            innerHtml: '关闭'
          },
          {
            name: 'Radio',

            props: {
              label: 1,
            },
            innerHtml: '开启'
          }
        ]
      },
      Input: {
        model: 'fi协办单位名称'
      }
    }
  },
  fi品牌爆光方式: {
    components: {
      RadioGroup: {
        children: [
          {
            name: 'Radio',
            props: {
              label: 0,
            },
            innerHtml: '隐藏'
          },
          {
            name: 'Radio',
            props: {
              label: 1,
            },
            innerHtml: '商家LOGO'
          },
          {
            name: 'Radio',
            props: {
              label: 2,
            },
            innerHtml: '宣传语'
          }
        ]
      },
      Input: {
        model: 'fi品牌爆光'
      },
      UploadFileSingle: {
        model: 'fi品牌爆光',
        children: {
          p: {
            props: {
              slot: 'tips'
            },
            innerHtml: '建议尺寸80*80px，大小不超过1M，格式为jpg/bmp/png/gif'
          }
        }
      }
    }
  },
  fi分享活动: {
    components: {
      RadioGroup: {
        children: [
          {
            name: 'Radio',
            props: {
              label: 0,
            },
            innerHtml: '关闭分享'
          },
          {
            name: 'Radio',
            props: {
              label: 1,
            },
            innerHtml: '开启分享'
          }
        ]
      },
    }
  },
  fi分享至朋友圈: {
    components: {
      RadioGroup: {
        children: [
          {
            name: 'Radio',
            label: 0,
            innerHtml: '关闭'
          },
          {
            name: 'Radio',
            label: 1,
            innerHtml: '开启'
          }
        ]
      },
    }
  },
  fi分享图标类型: {
    components: {
      RadioGroup: {
        children: [
          {
            name: 'Radio',
            props: {
              label: 0,
            },
            innerHtml: '默认'
          },
          {
            name: 'Radio',
            props: {
              label: 1,
            },
            innerHtml: '自定义',
            children: {
              UploadFileSingle: {
                children: {
                  p: {
                    props: {
                      slot: 'tips'
                    },
                    innerHtml: '建议尺寸200*200px，大小不超过1M，格式为jpg/bmp/png/gif'
                  }
                }
              }
            }
          }
        ]
      },
    }
  }
}