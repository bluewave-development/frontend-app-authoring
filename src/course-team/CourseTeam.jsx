import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Container,
  Layout,
} from '@openedx/paragon';

import InternetConnectionAlert from '../generic/internet-connection-alert';
import { useModel } from '../generic/model-store';
import SubHeader from '../generic/sub-header/SubHeader';
import messages from './messages';
import CourseTeamSideBar from './course-team-sidebar/CourseTeamSidebar';
import { useCourseTeam } from './hooks';
import getPageHeadTitle from '../generic/utils';
import ConnectionErrorAlert from '../generic/ConnectionErrorAlert';

const CourseTeam = ({ courseId }) => {
  const intl = useIntl();

  const courseDetails = useModel('courseDetails', courseId);
  document.title = getPageHeadTitle(courseDetails?.name, intl.formatMessage(messages.headingTitle));

  const {
    isLoading,
    isLoadingDenied,
    isQueryPending,
    isOwnershipHint,
    isInternetConnectionAlertFailed,
    handleInternetConnectionFailed,
  } = useCourseTeam({ intl, courseId });

  if (isLoadingDenied) {
    return (
      <Container size="xl" className="course-unit px-4 mt-4">
        <ConnectionErrorAlert />
      </Container>
    );
  }

  if (isLoading) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  return (
    <>
      <Container size="xl" className="course-team px-4">
        <section className="course-team-container mb-4">
          <Layout
            lg={[{ span: 9 }, { span: 3 }]}
            md={[{ span: 9 }, { span: 3 }]}
            sm={[{ span: 9 }, { span: 3 }]}
            xs={[{ span: 9 }, { span: 3 }]}
            xl={[{ span: 9 }, { span: 3 }]}
          >
            <Layout.Element>
              <article>
                <div>
                  <SubHeader
                    title={intl.formatMessage(messages.headingTitle)}
                    subtitle={intl.formatMessage(messages.headingSubtitle)}
                  />
                  <section className="course-team-section">
                    <div className="members-container">
                      <p className="mt-2">
                        {intl.formatMessage(messages.sectionNotAvailableBW)}
                      </p>
                    </div>
                  </section>
                </div>
              </article>
            </Layout.Element>
            <Layout.Element>
              <CourseTeamSideBar
                courseId={courseId}
                isOwnershipHint={isOwnershipHint}
              />
            </Layout.Element>
          </Layout>
        </section>
      </Container>
      <div className="alert-toast">
        <InternetConnectionAlert
          isFailed={isInternetConnectionAlertFailed}
          isQueryPending={isQueryPending}
          onInternetConnectionFailed={handleInternetConnectionFailed}
        />
      </div>
    </>
  );
};

CourseTeam.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default CourseTeam;
