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