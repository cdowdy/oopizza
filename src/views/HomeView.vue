<script>
import { IonContent, IonGrid, IonRow, IonCol, IonPage, IonApp } from '@ionic/vue';

export default {
  components: {
    IonApp,
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol
  }
}

</script>

<template>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="6">
            <FormKit type="radio"
                     name="preferedMeasure"
                     id="preferedMeasure"
                     label="Use Metric or US Customary"
                     :options="{
                    metric: 'Metric',
                    customary: 'US Customary',
              }"
            />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
</template>
