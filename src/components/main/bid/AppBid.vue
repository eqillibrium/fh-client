<template>
  <el-card
    shadow="hover"
    style="cursor: pointer;"
  >
      <template #header>
        <BidHeader :bid="bid" />
      </template>
    <div>
      <el-image style="width: 100%; height: auto" :src="`http://localhost:3000/static/${bid.image}`" fit="contain" />
    </div>
    <el-descriptions
      class="margin-top"
      :column="1"
      border
    >
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon style="paddingRight: 5px">
              <User />
            </el-icon>
            Username
          </div>
        </template>
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon style="paddingRight: 5px">
            </el-icon>
            Animal
          </div>
        </template>
        {{ bid.animalType === 1 ? 'Пёсик' : 'Котик' }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon style="paddingRight: 5px">
              <Place />
            </el-icon>
            Place
          </div>
        </template>
        {{ bid.address }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon style="padding-right: 5px">
              <Money />
            </el-icon>
            Award
          </div>
        </template>
        {{ bid.award }}
      </el-descriptions-item>
    </el-descriptions>
    <footer class="article__footer">
      <el-button-group>
        <el-button type="info">Открыть</el-button>
        <el-button type="success">Принять</el-button>
      </el-button-group>
      <small style="display: flex; justify-items: center; align-items: center">
        <el-icon>
          <Message />
        </el-icon>
        18
      </small>
    </footer>
  </el-card>
</template>

<script>
import { User, Timer, Place, Message, Money } from '@element-plus/icons-vue'
import BidHeader from '@/components/main/bid/BidHeader'

export default {
  props: {
    bid: Object
  },
  components: {
    BidHeader,
    User,
    Place,
    Message,
    Money
  },
  setup (props) {
    console.log(props)
  }
}
</script>

<style lang="scss" scoped>
.article {
  margin-bottom: 2rem;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__img {
    width: 100%;
    height: auto;
  }
  &__body {
    //margin-bottom: 1rem;
  }
  &__footer {
    display: flex;
    padding: 1rem;
    justify-content: space-between;
    align-items: center;
  }
}

.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}

.status sup {
  top: 15px
}

.body {
  margin: 0;
  padding: 0;
}

.flex-justify-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
