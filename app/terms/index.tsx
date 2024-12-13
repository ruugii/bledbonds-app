import StyledText from "../../components/StyledText";
import { StyleSheet, View, ScrollView } from "react-native";
import { Stack } from "expo-router";
import useScreenMode from "../../utilities/screenMode";
import { Colors } from "../../constants/Colors";
import { useTranslation } from "react-i18next";

export default function Therms() {

  const { mode } = useScreenMode()

  const headerTitle = () => <StyledText litle bold mayus>{t('screens.intro.terms.termsTitle')}</StyledText>

  const { t } = useTranslation()

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => headerTitle(),
          headerRight: () => null,
        }}
      />
      <View style={[styles.container, {
        backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
      }]}>
        <View style={[styles.box, styles.box2, {
          backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
        }]}>
          <ScrollView style={{ marginBottom: 20 }}>
            <View>
              <StyledText title bold mayus justify>{t('screens.intro.terms.termsText')}</StyledText>
              <StyledText xsmall justify>{t('screens.intro.terms.termsText2')}</StyledText>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>{t('screens.intro.terms.summaryText')}</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText2')}</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText3')}</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText4')}</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText5')}</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText6')}</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText7')}</StyledText>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>{t('screens.intro.terms.legalText')}</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.legalText2')}</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText8')}</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText9')}</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText10')}</StyledText>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>{t('screens.intro.terms.summaryText11')}</StyledText>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText12')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText13')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText14')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText15')}</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 20 }}>{t('screens.intro.terms.summaryText16')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText17')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText18')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText19')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText20')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText21')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText22')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText23')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText24')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText25')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText26')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText27')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText28')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText29')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText30')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText31')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText32')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText33')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText34')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.summaryText35')}</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText36')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText37')}</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText38')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText39')}</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText40')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText41')}</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText42')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText43')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText44')}</StyledText>
              </View>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>{t('screens.intro.terms.summaryText45')}</StyledText>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText46')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText47')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText48')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText49')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText50')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText51')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText52')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText53')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText54')}</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText55')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText56')}</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText57')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText58')}</StyledText>
              </View>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>{t('screens.intro.terms.sumaryText59')}</StyledText>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText60')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText61')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText62')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText63')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText64')}</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText65')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText66')}</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText67')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText68')}</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText69')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText70')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText71')}</StyledText>
              </View>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>{t('screens.intro.terms.sumaryText72')}</StyledText>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText73')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText74')}</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText75')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText76')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText77')}</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText78')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText79')}</StyledText>
              </View>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>{t('screens.intro.terms.sumaryText80')}</StyledText>
              <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText81')}</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText82')}</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText83')}</StyledText>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>{t('screens.intro.terms.sumaryText84')}</StyledText>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText85')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText86')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText87')}</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText88')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText89')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText90')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText91')}</StyledText>
              </View>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>{t('screens.intro.terms.sumaryText92')}</StyledText>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText93')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText94')}</StyledText>
              </View>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>{t('screens.intro.terms.sumaryText95')}</StyledText>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText96')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText97')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.sumaryText98')}</StyledText>
              </View>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>{t('screens.intro.terms.sumaryText99')}</StyledText>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.100')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.101')}</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.102')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.103')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.104')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.105')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.106')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.107')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.108')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.109')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.110')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.111')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.112')}</StyledText>
              </View>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>{t('screens.intro.terms.113')}</StyledText>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.114')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.115')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.116')}</StyledText>
              </View>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>{t('screens.intro.terms.117')}</StyledText>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>{t('screens.intro.terms.118')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.119')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.120')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.121')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.122')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.123')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.124')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.125')}</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.126')}</StyledText>
              </View>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>{t('screens.intro.terms.127')}</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>{t('screens.intro.terms.128')}</StyledText>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  formGroup: {
    marginTop: 10,
  },
  linkStyle: {
    textDecorationLine: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  box: {
    flex: 1,
  },
  box2: {
    flex: 10,
    height: '100%',
  },
});
